@echo off
title Deploy Jay Parmar Portfolio to Vercel
color 0b
echo ============================================================
echo      JAY PARMAR PORTFOLIO - 1-CLICK VERCEL DEPLOYMENT
echo ============================================================
echo.
echo  Preparing deployment to Vercel...
echo  (If asked to log in, your browser will open - simply click GitHub/Google)
echo.
cd /d "%~dp0"
call npx --yes vercel --prod
echo.
echo ============================================================
echo  Deployment complete! Your live URL is displayed above.
echo ============================================================
echo.
pause
