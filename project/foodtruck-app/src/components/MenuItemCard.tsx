// src/components/MenuItemCard.tsx
import React from "react";
import { MenuItem } from "../models/MenuItem";

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  isSelected: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`menu-item-card ${isSelected ? "active" : ""}`}
      onClick={() => onSelect(item)}
    >
      <div className="item-header">
        <h4>{item.name.toUpperCase()}</h4>
        <span>{item.price} SEK</span>
      </div>
      <p className="item-description">{item.ingredients?.join(", ")}</p>
    </div>
  );
};

export default MenuItemCard;
