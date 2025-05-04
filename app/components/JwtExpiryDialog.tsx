import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { isTokenExpiring, requestInterceptor } from "../utils/utils";
import { getToken, logout, storeJwt } from "../utils/jwtStore";
import Timer from "easytimer.js";
var timerJs = new Timer();
const timerEx = 10;
const JwtExpiryDialog = () => {
  const handleCloseDialog = () => {
    timerJs.stop();
    setIsDialogOpen(false);
    setT(timerEx);
    logout();
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [t, setT] = useState(timerEx);
  const [token, setToken] = useState();
  useEffect(() => {
    async function a() {
      const token = await getToken();
      if (token) {
        const intervalId = setInterval(() => {
          if (isTokenExpiring(token)) {
            setIsDialogOpen(true);
            if (!timerJs.isRunning()) {
              timerJs.start({
                countdown: true,
                startValues: { seconds: timerEx },
              });
              timerJs.addEventListener("secondsUpdated", function (e) {
                setT(timerJs.getTimeValues().seconds);
              });
              timerJs.addEventListener("targetAchieved", handleCloseDialog);
            }

            clearInterval(intervalId); // Stop checking once the dialog is shown
          }
        }, 10000); // Check every 10 seconds
      }
    }
    a();
  }, [token]);

  async function renewJwt() {
    timerJs.stop();
    setIsDialogOpen(false);
    setT(timerEx);
    const renewJwt = await requestInterceptor("auth/renewJwt", "", "POST");
    storeJwt(renewJwt);
    setToken(renewJwt?.data.accessToken);
  }

  return (
    <div>
      {isDialogOpen && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You are about to be logged out. {t}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Press Continue to extend session or else logout
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCloseDialog}>
                Logout
              </AlertDialogCancel>
              <AlertDialogAction onClick={renewJwt}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default JwtExpiryDialog;
