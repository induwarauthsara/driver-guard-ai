# 🚀 DriverGuard AI - Production Deployment Guide

## GitHub to Azure Production Path

### 📋 **Current Status:**
- ✅ Flask app with API endpoints ready
- ✅ Production-optimized configuration
- ✅ GitHub Actions workflow prepared
- ✅ Clean project structure

---

## 🔧 **Step-by-Step Deployment:**

### **Step 1: Create Azure App Service**
```powershell
.\github_deploy.ps1
```
This creates:
- Clean app name: `driverguardai`
- Production URL: `https://driverguardai.azurewebsites.net`
- API endpoint: `https://driverguardai.azurewebsites.net/api/detect`

### **Step 2: Create GitHub Repository**
1. Go to https://github.com/new
2. Repository name: `driverguardai`
3. Make it **Public** (or Private if you prefer)
4. Don't initialize with README (we have files already)

### **Step 3: Upload Your Code to GitHub**
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: DriverGuard AI production ready"

# Connect to your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/induwarauthsara/driver-guard-ai.git
git branch -M ai-azure-prod
git push -u origin ai-azure-prod
```

### **Step 4: Connect GitHub to Azure**
```powershell
.\connect_github.ps1
```
Enter your repository URL when prompted.

---

## 🌐 **Production URLs:**
- **Main App**: https://driverguardai.azurewebsites.net
- **API Endpoint**: https://driverguardai.azurewebsites.net/api/detect
- **Health Check**: https://driverguardai.azurewebsites.net/health

---

## 💰 **Cost Breakdown:**
- **App Service (Basic B1)**: ~$13.14/month
- **Bandwidth**: Free tier (5GB)
- **Total**: ~$15-20/month (within $50 budget)

---

## 🔄 **Automatic Deployments:**
Once connected, every push to `ai-azure-prod` branch automatically deploys to Azure!

---

## 📊 **API Usage Example:**
```javascript
// For external websites
const response = await fetch('https://driverguardai.azurewebsites.net/api/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        image: 'data:image/jpeg;base64,YOUR_BASE64_IMAGE'
    })
});

const result = await response.json();
// result: { sleepy: true/false, ear: 0.xx, confidence: 0.xx }
```

---

## 🎯 **Next Steps After Deployment:**
1. Test API endpoints
2. Set up cost alerts in Azure Portal
3. Monitor performance
4. Add custom domain (optional)
5. Set up SSL certificate (automatic with custom domain)
