@echo off
title Deploy Jay Parmar Portfolio to Netlify
color 0a
echo ============================================================
echo      JAY PARMAR PORTFOLIO - 1-CLICK NETLIFY DEPLOYMENT
echo ============================================================
echo.
echo  Preparing deployment to Netlify...
echo  (If asked to log in, your browser will open - simply authorize)
echo.
cd /d "%~dp0"
call npx --yes netlify-cli deploy --prod --dir=.
echo.
echo ============================================================
echo  Deployment complete! Your live URL is displayed above.
echo ============================================================
echo.
pause
