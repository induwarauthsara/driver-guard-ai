# 🔗 Manual GitHub Connection Guide

## ✅ **Azure App Service Ready!**
Your app is created at: **https://driverguardai.azurewebsites.net**

---

## 🔧 **Connect GitHub via Azure Portal (Recommended)**

### **Step 1: Open Azure Portal**
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **App Services** → **driverguardai**

### **Step 2: Set Up Deployment Center**
1. In the left menu, click **Deployment Center**
2. Click **Settings** tab
3. Choose **Source**: **GitHub**
4. Click **Authorize** and sign in to GitHub
5. Select:
   - **Organization**: `induwarauthsara`
   - **Repository**: `driver-guard-ai`
   - **Branch**: `ai-azure-prod`
6. Click **Save**

### **Step 3: Verify Deployment**
1. Go to **Deployment Center** → **Logs** tab
2. You should see deployment starting automatically
3. Wait 3-5 minutes for build to complete

---

## 🚀 **Alternative: Manual Deployment**

If GitHub connection has issues, you can deploy manually:

```powershell
# Quick manual deployment
az webapp deployment source config-zip --resource-group driverguard-rg --name driverguardai --src deployment.zip
```

---

## 🌐 **Test Your Deployment**

Once deployed, test these URLs:

1. **Main App**: https://driverguardai.azurewebsites.net
2. **Health Check**: https://driverguardai.azurewebsites.net/health
3. **API Test**: Open `api_test.html` locally and point to your Azure URL

---

## ⚡ **Quick Test Commands**

```bash
# Test health endpoint
curl https://driverguardai.azurewebsites.net/health

# Test API endpoint (with sample data)
curl -X POST https://driverguardai.azurewebsites.net/api/detect \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."}'
```

---

## 🔍 **If You See Errors**

1. **Check Logs**: Azure Portal → App Services → driverguardai → Log stream
2. **Restart App**: Azure Portal → App Services → driverguardai → Restart
3. **Check Configuration**: Ensure all app settings are correct

---

## 💰 **Monthly Cost**: ~$15-20 (Basic B1 plan)

**Your production app is ready! 🎉**
