#!/bin/bash
# Azure App Service Restart Script

echo "🔄 Restarting Azure App Service to clear container conflicts..."

# Option 1: Using Azure CLI (if available)
if command -v az &> /dev/null; then
    echo "📡 Using Azure CLI to restart..."
    az webapp restart --resource-group "driverguard-rg" --name "driverguardai"
    echo "✅ App service restarted successfully!"
else
    echo "⚠️  Azure CLI not found. Please restart manually via Azure Portal:"
    echo "   1. Go to https://portal.azure.com"
    echo "   2. Navigate to App Services → driverguardai"
    echo "   3. Click 'Restart' in the overview page"
fi

echo ""
echo "🚀 Your app should be available at:"
echo "   https://driverguardai.azurewebsites.net"
echo ""
echo "🧪 Test endpoints:"
echo "   Health: https://driverguardai.azurewebsites.net/health"
echo "   Status: https://driverguardai.azurewebsites.net/api/status"
echo ""
echo "📊 Monitor logs at:"
echo "   https://driverguardai.scm.azurewebsites.net/api/logs/docker"
