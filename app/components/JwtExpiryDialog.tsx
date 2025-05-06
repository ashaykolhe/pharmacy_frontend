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
} from "@/components/ui/alert-dialog";
import { isTokenExpiring, requestInterceptor } from "../utils/utils";
import { logout, storeJwt } from "../utils/jwtStore";
import Timer from "easytimer.js";
const timerJs = new Timer();
const timerMain = new Timer();
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
  // const [tokenState, setTokenState] = useState(null);
  useEffect(() => {
    a();
  }, []);

  function a() {
    // const token = await getToken();
    // const localtoken = localStorage.getItem("token");
    // localtoken
    // if (token) {
    // const intervalId = setInterval(() => {
    //   console.log("setinterval");
    //   if (isTokenExpiring(token, timerEx)) {
    //     console.log("expiring");
    //     setIsDialogOpen(true);
    //     if (!timerJs.isRunning()) {
    //       timerJs.start({
    //         countdown: true,
    //         startValues: { seconds: timerEx },
    //       });
    //       timerJs.addEventListener("secondsUpdated", function (e) {
    //         setT(timerJs.getTimeValues().seconds);
    //       });
    //       timerJs.addEventListener("targetAchieved", handleCloseDialog);
    //     }
    //     clearInterval(intervalId);
    //   }
    // }, 1000); // Check every 10 seconds
    if (!timerMain.isRunning()) {
      timerMain.start();
      timerMain.addEventListener("secondsUpdated", function () {
        // console.log("timer started");
        // console.log(token);
        if (isTokenExpiring(localStorage.getItem("token"), timerEx)) {
          // console.log("expiring");
          setIsDialogOpen(true);
          if (!timerJs.isRunning()) {
            timerJs.start({
              countdown: true,
              startValues: { seconds: timerEx },
            });
            timerJs.addEventListener("secondsUpdated", function () {
              setT(timerJs.getTimeValues().seconds);
            });
            timerJs.addEventListener("targetAchieved", handleCloseDialog);
          }
          timerMain.stop();
        }
      });
    }
    // }
  }

  async function renewJwt() {
    timerJs.stop();
    setIsDialogOpen(false);
    setT(timerEx);
    const renewJwts = await requestInterceptor("auth/renewJwt", "", "POST");
    if (renewJwts) {
      storeJwt(renewJwts);
      // const token = await getToken();
      // setTokenState(renewJwts.data.accessToken);
      a();
    }
  }

  return (
    <div>
      {isDialogOpen && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You are about to be logged out in {t} seconds
              </AlertDialogTitle>
              <AlertDialogDescription>
                Press Continue to extend session or else logout
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="submit" onClick={handleCloseDialog}>
                Logout
              </AlertDialogCancel>
              <AlertDialogAction className="submit" onClick={renewJwt}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default JwtExpiryDialog;
