import styles from "./PlansList.module.css";

import { MdOutlineEdit } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { RiResetRightLine } from "react-icons/ri";
import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import Input from "@/components/ui/Input";

const PlansList: React.FC = () => {
  return (
    <>
      <hgroup className={styles.container}>
        <div className={styles["plans-pageHeading"]}>
          <h1>Health Insurance Plans</h1>
          <p>Manage and oversee all health insurance plans on this system</p>
        </div>
        <Button
          variant="primary"
          to="/admin/plans/create"
          className={styles["create-button"]}
        >
          <FaPlus className={styles.icon} />
        </Button>
      </hgroup>
      <div className={styles["plans-container"]}>
        <div className={styles["filters"]}>
          <Input
            id="planId"
            type="text"
            placeholder="Search by ID or Name"
            className={styles["search-bar"]}
          />

          <Select
            onValueChange={(v: string) => {
              console.log("Status filter changed:", v);
            }}
            value=""
          >
            <SelectTrigger className={styles["filter-dropdown"]}>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {["", "Active", "InActive", "Pending"].map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(v: string) => {
              console.log("Creation Date filter changed:", v);
            }}
            value=""
          >
            <SelectTrigger className={styles["filter-dropdown"]}>
              <SelectValue placeholder="Filter by Creation Date" />
            </SelectTrigger>
            <SelectContent>
              {["", "Today", "This Week", "This Month", "This Year"].map(
                (status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(v: string) => {
              console.log("Plan type filter changed:", v);
            }}
            value=""
          >
            <SelectTrigger className={styles["filter-dropdown"]}>
              <SelectValue placeholder="Filter by Plan Type" />
            </SelectTrigger>
            <SelectContent>
              {["", "Basic", "Premium", "EnterPrise"].map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className={styles["reset-btn"]}>
            <RiResetRightLine />
          </Button>
        </div>

        <div className={styles["plans-table-container"]}>
          <table className={styles["plans-table"]}>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Status</th>
                <th>Created Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Health Basic</td>
                <td>Active</td>
                <td>2024-09-10</td>
                <td className={styles["actions"]}>
                  <NavLink to="/admin/plans/{planId}/view">
                    <GrFormView size={22} />
                  </NavLink>
                  <NavLink to="/admin/plans/{planId}/edit">
                    <MdOutlineEdit size={22} />
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td>Health Plus</td>
                <td>Inactive</td>
                <td>2024-08-20</td>
                <td className={styles["actions"]}>
                  <NavLink to="/admin/plans/{planId}/view">
                    <GrFormView size={22} />
                  </NavLink>
                  <NavLink to="/admin/plans/{planId}/edit">
                    <MdOutlineEdit size={22} />
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PlansList;
