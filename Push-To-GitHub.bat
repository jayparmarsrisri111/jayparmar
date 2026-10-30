@echo off
title Push Jay Parmar Portfolio to GitHub
color 0b
echo ============================================================
echo         JAY PARMAR PORTFOLIO - 1-CLICK GITHUB PUSH
echo ============================================================
echo.
echo Target Repository:
echo https://github.com/jayparmarsrisri111/jayparmar.git
echo.
echo Pushing your complete responsive portfolio to GitHub...
echo (If a GitHub sign-in window appears, simply click 'Sign in with your browser')
echo.
cd /d "%~dp0"
git push -u origin main --force
echo.
echo ============================================================
echo [SUCCESS] Your portfolio code is now live on GitHub!
echo Repository URL: https://github.com/jayparmarsrisri111/jayparmar
echo ============================================================
echo.
pause
