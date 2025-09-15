import styles from "../styles/ReportsDashboard.module.css";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from "@/components/ui/Button";
import { FaFileExport } from "react-icons/fa6";

type Role = "admin" | "caseworker";

interface ReportCard {
  title: string;
  description: string;
  path: string;
  roles: Role[];
}

interface ReportsDashboardProps {
  role: Role;
}

const ReportsDashboard: React.FC<ReportsDashboardProps> = ({ role }) => {
  // const [role] = useState<"caseworker" | "admin">("admin");

  const reports: ReportCard[] = [
    {
      title: "System Audit Report",
      description: "Track actions, logins, suspicious activities.",
      path: "audit",
      roles: ["admin"],
    },
    {
      title: "Payment Status Report",
      description: "Monitor payment gateway responses & statuses.",
      path: "payments",
      roles: ["admin", "caseworker"],
    },
    {
      title: "Notice Report",
      description: "Notices sent, delivered, or failed.",
      path: "notices",
      roles: ["admin", "caseworker"],
    },
    {
      title: "Benefit Issuance Report",
      description: "Track benefit disbursement & transaction status.",
      path: "benefits",
      roles: ["admin", "caseworker"],
    },
    {
      title: "Plan Performance Report",
      description: "System-wide plan enrollment & utilization.",
      path: "plan-performance",
      roles: ["admin"],
    },
    {
      title: "Beneficiary Report",
      description: "Citizen details, eligibility, and benefits history.",
      path: "beneficiaries",
      roles: ["admin", "caseworker"],
    },
    {
      title: "Daily Status Report",
      description: "Snapshot of today's onboarding, submissions, decisions.",
      path: "daily-status",
      roles: ["admin", "caseworker"],
    },
    {
      title: "Approved Citizens Report",
      description: "List of citizens approved for benefits.",
      path: "approved",
      roles: ["admin", "caseworker"],
    },
    {
      title: "Denied Citizens Report",
      description: "List of citizens denied eligibility & reasons.",
      path: "denied",
      roles: ["admin", "caseworker"],
    },
  ];

  const accessibleReports = reports.filter((r) => r.roles.includes(role));

  // 🔹 Dummy Data
  const summaryData =
    role === "admin"
      ? {
          citizens: 25000,
          plans: 5200,
          notices: 18000,
          benefits: 15000,
          payments: { success: 14000, failure: 1000 },
        }
      : {
          citizens: 320,
          plans: 85,
          notices: 210,
          benefits: 175,
          payments: { success: 160, failure: 15 },
        };

  const benefitsByPlan = [
    { plan: "SNAP", count: role === "admin" ? 6000 : 80 },
    { plan: "Medicaid", count: role === "admin" ? 5000 : 55 },
    { plan: "CCAP", count: role === "admin" ? 2000 : 20 },
    { plan: "Medicare", count: role === "admin" ? 3000 : 15 },
  ];

  const paymentTrend = [
    { month: "Jan", success: 200, failure: 10 },
    { month: "Feb", success: 180, failure: 20 },
    { month: "Mar", success: 220, failure: 15 },
    { month: "Apr", success: 210, failure: 12 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>
          Reports Dashboard ({role === "admin" ? "Admin" : "Caseworker"} View)
          <p className={styles.subtitle}>
            {role === "admin"
              ? "System-wide analytics and monitoring."
              : "Reports for your assigned citizens and cases."}
          </p>
        </h2>
        <Button className={styles.actionBtn} to="export">
          <FaFileExport size={18} />
          Export Report
        </Button>
      </hgroup>

      <div className={styles.wrapper}>
        {/* 🔹 Summary Cards */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>{summaryData.citizens}</h3>
            <p>Citizens Onboarded</p>
          </div>
          <div className={styles.card}>
            <h3>{summaryData.plans}</h3>
            <p>Active Plans</p>
          </div>
          <div className={styles.card}>
            <h3>{summaryData.notices}</h3>
            <p>Notices Generated</p>
          </div>
          <div className={styles.card}>
            <h3>{summaryData.benefits}</h3>
            <p>Benefits Issued</p>
          </div>
        </div>

        {/* 🔹 Charts */}
        <div className={styles.charts}>
          <div className={styles.chartBox}>
            <h4>Benefits by Plan</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={benefitsByPlan}>
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartBox}>
            <h4>Payment Success vs Failure</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Success", value: summaryData.payments.success },
                    { name: "Failure", value: summaryData.payments.failure },
                  ]}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartBox}>
            <h4>Payment Trends</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={paymentTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="success" stroke="#22c55e" />
                <Line type="monotone" dataKey="failure" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.grid}>
          {accessibleReports.map((report) => (
            <div key={report.path} className={styles.reportCard}>
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <Button to={report.path} className={styles.viewBtn}>
                View Report →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
