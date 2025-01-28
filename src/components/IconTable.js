import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

import styles from "./IconTable.module.css";
import { useState } from "react";

export default function IconTable({ name, icons, columns, editVisibility }) {
  const [completed, setCompleted] = useState(JSON.parse(localStorage.getItem(`completion-${name}`)) || []);
  let totalCount = icons.length;
  let selected = completed.length;
  if (name === "Enemies") {
    // To replicate the in-game behavior - 100.5% 186/185
    // accounts for player death, but doesn't show it in the total count
    totalCount -= 1;
    selected += 1;
  }

  const handleCompletion = (iconName) => {
    let newList;
    if (completed.includes(iconName)) {
      newList = completed.filter(item => item !== iconName);
    } else {
      newList = [...completed, iconName];
    }
    localStorage.setItem(`completion-${name}`, JSON.stringify(newList));
    setCompleted(newList);
  };

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.percent}>
          {name} - {Math.round((selected / totalCount) * 1000) / 10}%
        </span>{" "}
        <span className={styles.total}>
          {selected}/{totalCount}
        </span>
      </div>
      <div
        className={styles.table}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {icons.map((icon) => (
          <Icon
            key={icon.id}
            prefix={name}
            icon={icon}
            disabled={icon.disabled}
            editVisibility={editVisibility}
            completed={completed}
            completionSelection={handleCompletion}
          />
        ))}
      </div>
    </div>
  );
}

IconTable.propTypes = {
  icons: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
