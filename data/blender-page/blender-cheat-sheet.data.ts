import { IBlenderCheatSheetData } from "@data/model/blender-page/blender-cheat-sheet.model";

export const dataObjectModeTable: IBlenderCheatSheetData = {
  headTitle: ["Object Mode (3D viewport)", ""],
  bodyData: [
    ["CTRL + TAB", "Mode Pie Menu"],
    ["TAB", "toggle (Edit/­Object Mode)"],
    ["CTRL + M Then X/Y/Z (or MMB (drag))", "Mirror"],
    ["CTRL + P", "Set Parent (last selected)"],
    ["ALT + P", "Clear Parent"],
    ["SHIFT + TAB", "Toggle Snapping"],
    ["ALT + G", "Clear Location"],
    ["ALT + R", "Clear Scale"],
    ["CTRL + A", "Apple Location / Scale / Rotation"],
    ["CTRL + J", "Join Selected Objects"],
    ["CTRL + L", "Copy Attributes to New Objects"],
    ["CTRL + 0/1/2/­3/4/5", "Add Subdiv­ision level"],
    ["ALT + B", "Mask view to region / Clear mask"],
    ["SHIFT + C", "Center 3D cursor"],
    ["M", "Move active object to collection"],
    ["CTRL + ALT + Numpad 0", "Move Active Camera to view"],
    ["CTRL + Numpad 0", "Set as Active Camera"],
  ],
};
