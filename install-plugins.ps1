cd "C:\Users\KelechiMwenge\Desktop\Quartz_Clearnet"
npm run install-plugins 2>&1 | Out-File -FilePath "C:\Users\KelechiMwenge\Desktop\Quartz_Clearnet\plugin-install.log" -Force
Get-Content "C:\Users\KelechiMwenge\Desktop\Quartz_Clearnet\plugin-install.log"
