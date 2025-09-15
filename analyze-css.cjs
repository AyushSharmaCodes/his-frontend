#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to extract CSS class names from a CSS module file
function extractCSSClasses(cssContent) {
  const classNames = new Set();

  // Match class selectors (including pseudo-classes, media queries, etc.)
  const classRegex = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
  let match;

  while ((match = classRegex.exec(cssContent)) !== null) {
    classNames.add(match[1]);
  }

  return Array.from(classNames);
}

// Function to check if a class is used in TSX content
function isClassUsed(className, tsxContent) {
  // Check for direct usage like styles.className
  const directUsage = new RegExp(`styles\\.${className}\\b`, "g");
  if (directUsage.test(tsxContent)) return true;

  // Check for dynamic usage like styles[variableName] where variableName could be className
  const dynamicUsage = new RegExp(`styles\\[.*\\]`, "g");
  if (dynamicUsage.test(tsxContent)) {
    // If there's dynamic usage, we should be more careful
    // Check if the className appears as a string literal
    const stringUsage = new RegExp(`["'\`]${className}["'\`]`, "g");
    if (stringUsage.test(tsxContent)) return true;
  }

  return false;
}

// Function to find corresponding TSX file for a CSS module
function findCorrespondingTSX(cssFilePath) {
  const dir = path.dirname(cssFilePath);
  const baseName = path.basename(cssFilePath, ".module.css");

  // Try different possible TSX file names
  const possibleNames = [
    `${baseName}.tsx`,
    `${baseName}.ts`,
    // Handle special case for StateValidation
    baseName === "StateValidation" ? "StateValidaiton.tsx" : null,
  ].filter(Boolean);

  for (const name of possibleNames) {
    const tsxPath = path.join(dir, name);
    if (fs.existsSync(tsxPath)) {
      return tsxPath;
    }
  }

  // If no direct match, try to find in parent pages directory
  const pagesDir = path.join(path.dirname(dir), "pages");
  if (fs.existsSync(pagesDir)) {
    for (const name of possibleNames) {
      const tsxPath = path.join(pagesDir, name);
      if (fs.existsSync(tsxPath)) {
        return tsxPath;
      }
    }
  }

  return null;
}

// Function to remove unused CSS classes from content
function removeUnusedClasses(cssContent, unusedClasses) {
  let updatedContent = cssContent;

  for (const className of unusedClasses) {
    // Remove the class definition and its entire block
    const classRegex = new RegExp(
      `\\.${className}\\s*\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}`,
      "gs"
    );
    updatedContent = updatedContent.replace(classRegex, "");

    // Also remove any standalone selectors that might be missed
    const standaloneRegex = new RegExp(
      `\\.${className}\\s*(?::[^\\s{]+)?\\s*\\{[^}]*\\}`,
      "gs"
    );
    updatedContent = updatedContent.replace(standaloneRegex, "");
  }

  // Clean up extra whitespace
  updatedContent = updatedContent.replace(/\n\s*\n\s*\n/g, "\n\n");

  return updatedContent;
}

// Main analysis function
async function analyzeCSSModules() {
  const baseDir = "/Users/ayush/Developer/Personal-Projects/his-ui/";
  const cssModuleFiles = [
    "src/components/admin/pages/AdminDashBoard.module.css",
    "src/components/admin/pages/CaseWorkerCreate.module.css",
    "src/components/admin/pages/CaseWorkerProfile.module.css",
    "src/components/admin/pages/CaseWorkers.module.css",
    "src/components/admin/pages/NavBar.module.css",
    "src/components/admin/pages/PlanCreate.module.css",
    "src/components/admin/pages/PlansList.module.css",
    "src/components/admin/pages/PlanUpdate.module.css",
    "src/components/admin/pages/PlanView.module.css",
    "src/components/application/pages/ApplicationHomePage.module.css",
    "src/components/application/pages/CitizenOnboarding.module.css",
    "src/components/application/pages/OnboardSuccess.module.css",
    "src/components/application/pages/StateValidation.module.css",
    "src/components/benefits/pages/BenefitConfirmation.module.css",
    "src/components/benefits/pages/BenefitHistory.module.css",
    "src/components/benefits/pages/BenefitIssuanceDashboard.module.css",
    "src/components/benefits/pages/BenefitSuccess.module.css",
    "src/components/benefits/pages/IssueBenefits.module.css",
    "src/components/benefits/pages/PaymentStatus.module.css",
    "src/components/case-worker/pages/CaseWorkerDashboard.module.css",
    "src/components/case-worker/pages/CaseWorkerNavBar.module.css",
    "src/components/data-collection/pages/CitizenData.module.css",
    "src/components/data-collection/pages/CitizenDataEntryForm.module.css",
    "src/components/data-collection/pages/ReviewApplicationData.module.css",
    "src/components/data-collection/pages/SubmissionSuccess.module.css",
    "src/components/data-collection/pages/UploadDocuments.module.css",
    "src/components/eligibility/pages/EligibilityCheck.module.css",
    "src/components/eligibility/pages/EligibilityDashboard.module.css",
    "src/components/eligibility/pages/EligibilityResult.module.css",
    "src/components/general/styles/ErrorPage.module.css",
    "src/components/notice/pages/CitizenNoticeView.module.css",
    "src/components/notice/pages/GenerateNotice.module.css",
    "src/components/notice/pages/NoticeDashboard.module.css",
    "src/components/notice/pages/NoticeSendFailure.module.css",
    "src/components/notice/pages/NoticeSendSuccess.module.css",
    "src/components/reports/styles/ApprovedCitizensReport.module.css",
    "src/components/reports/styles/BeneficiaryReport.module.css",
    "src/components/reports/styles/BenefitIssuanceReport.module.css",
    "src/components/reports/styles/DailyStatusReport.module.css",
    "src/components/reports/styles/DeniedCitizensReport.module.css",
    "src/components/reports/styles/ExportReports.module.css",
    "src/components/reports/styles/NoticeReport.module.css",
    "src/components/reports/styles/PaymentStatusReport.module.css",
    "src/components/reports/styles/PlanPerformanceReport.module.css",
    "src/components/reports/styles/ReportsDashboard.module.css",
    "src/components/reports/styles/SystemAuditReport.module.css",
    "src/components/ui/Button.module.css",
    "src/components/ui/Calendar.module.css",
    "src/components/ui/Card.module.css",
    "src/components/ui/Checkbox.module.css",
    "src/components/ui/Input.module.css",
    "src/components/ui/Label.module.css",
    "src/components/ui/Popover.module.css",
    "src/components/ui/Select.module.css",
    "src/components/ui/TextArea.module.css",
    "src/components/user/forgot-password-page/ForgotPassword.module.css",
    "src/components/user/landing-page/LandingPage.module.css",
    "src/components/user/login/LoginCard.module.css",
    "src/components/user/login/LoginPage.module.css",
    "src/components/user/logout/LogoutSuccess.module.css",
    "src/components/user/profile/ProfilePage.module.css",
  ].map((f) => path.join(baseDir, f));

  const results = [];

  for (const cssFile of cssModuleFiles) {
    try {
      const cssContent = fs.readFileSync(cssFile, "utf8");
      const tsxFile = findCorrespondingTSX(cssFile);

      if (!tsxFile) {
        console.log(`⚠️  No corresponding TSX file found for ${cssFile}`);
        continue;
      }

      const tsxContent = fs.readFileSync(tsxFile, "utf8");
      const cssClasses = extractCSSClasses(cssContent);
      const unusedClasses = cssClasses.filter(
        (className) => !isClassUsed(className, tsxContent)
      );

      results.push({
        cssFile,
        tsxFile,
        totalClasses: cssClasses.length,
        unusedClasses: unusedClasses,
        usedClasses: cssClasses.filter((className) =>
          isClassUsed(className, tsxContent)
        ),
      });

      console.log(`\n📁 ${path.relative(process.cwd(), cssFile)}`);
      console.log(`   TSX: ${path.relative(process.cwd(), tsxFile)}`);
      console.log(`   Total classes: ${cssClasses.length}`);
      console.log(
        `   Used classes: ${cssClasses.length - unusedClasses.length}`
      );
      console.log(`   Unused classes: ${unusedClasses.length}`);

      if (unusedClasses.length > 0) {
        console.log(`   🗑️  Unused: ${unusedClasses.join(", ")}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${cssFile}:`, error.message);
    }
  }

  return results;
}

// Export for use
module.exports = {
  extractCSSClasses,
  isClassUsed,
  findCorrespondingTSX,
  removeUnusedClasses,
  analyzeCSSModules,
};

if (require.main === module) {
  analyzeCSSModules();
}
