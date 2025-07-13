import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ManagerPage: React.FC = () => {
  const navItems = [
    { name: "Doctor", path: "doctor" },
    { name: "Expert Field", path: "expertField" },
    { name: "Treatment", path: "treatment" },
    { name: "Doctor Schedule", path: "scheduleDoctor" },
  ];

  const styles = {
    navbar: {
      backgroundColor: "#0077cc",
      padding: "10px",
      display: "flex",
      gap: "20px",
    },
    navItem: {
      color: "white",
      textDecoration: "none",
      fontWeight: 500,
    },
    activeNavItem: {
      textDecoration: "underline",
      fontWeight: "bold",
    },
    content: {
      padding: "20px",
    },
  };

  return (
    <div>
      <nav style={styles.navbar}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/manager/${item.path}`}
            style={({ isActive }) =>
              isActive
                ? { ...styles.navItem, ...styles.activeNavItem }
                : styles.navItem
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Đây là nơi hiển thị các component con */}
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerPage;
