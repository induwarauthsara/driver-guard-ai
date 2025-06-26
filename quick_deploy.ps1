# Quick Deploy - Get your code deployed immediately
# Use this to deploy your Flask app right now

Write-Host "*** DriverGuard AI - Quick Deploy ***" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$ResourceGroup = "driverguard-rg"
$AppName = "driverguardai"

Write-Host "[INFO] Creating deployment package..." -ForegroundColor Yellow

# Essential files for Flask app
$coreFiles = @(
    "app.py",
    "requirements.txt",
    "templates",
    "static"
)

# Check if files exist
foreach ($file in $coreFiles) {
    if (!(Test-Path $file)) {
        Write-Host "[ERROR] Missing: $file" -ForegroundColor Red
        exit 1
    }
}

# Create deployment package
$deployDir = "quick_deploy"
if (Test-Path $deployDir) { Remove-Item $deployDir -Recurse -Force }
New-Item -ItemType Directory -Path $deployDir -Force | Out-Null

# Copy core files
Copy-Item "app.py" "$deployDir/" -Force
Copy-Item "requirements.txt" "$deployDir/" -Force
Copy-Item "templates" "$deployDir/" -Recurse -Force
Copy-Item "static" "$deployDir/" -Recurse -Force

Write-Host "[COPIED] Essential Flask files" -ForegroundColor Green

# Create zip
Compress-Archive -Path "$deployDir/*" -DestinationPath "quick_deploy.zip" -Force

Write-Host "[INFO] Deploying to Azure..." -ForegroundColor Yellow

# Deploy
az webapp stop --resource-group $ResourceGroup --name $AppName
Start-Sleep -Seconds 3

az webapp deployment source config-zip --resource-group $ResourceGroup --name $AppName --src "quick_deploy.zip"

Start-Sleep -Seconds 5
az webapp start --resource-group $ResourceGroup --name $AppName

# Clean up
Remove-Item $deployDir -Recurse -Force
Remove-Item "quick_deploy.zip" -Force

Write-Host ""
Write-Host "[SUCCESS] Deployment completed!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host "[URL] https://driverguardai.azurewebsites.net" -ForegroundColor Green
Write-Host "[API] https://driverguardai.azurewebsites.net/api/detect" -ForegroundColor Green
Write-Host "[HEALTH] https://driverguardai.azurewebsites.net/health" -ForegroundColor Green
Write-Host ""
Write-Host "[INFO] App may take 2-3 minutes to fully start" -ForegroundColor Yellow

# Test health endpoint
Write-Host "[INFO] Testing health endpoint in 30 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

try {
    $response = Invoke-WebRequest -Uri "https://driverguardai.azurewebsites.net/health" -TimeoutSec 30
    Write-Host "[SUCCESS] Health check passed! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "[INFO] App still starting up. Try again in a few minutes." -ForegroundColor Yellow
}
