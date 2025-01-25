import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSections } from "../context/SectionsContext"; // Import useSections hook
import axios from "axios";
import { saveAs } from "file-saver"; // For saving files
import jsPDF from "jspdf"; // For generating PDF
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const DynamicTablePage = () => {
  const { t } = useTranslation(); // Initialize translation
  const { sectionId, tableId } = useParams();
  const { sections, loading, error } = useSections();
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentTable, setCurrentTable] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (sections.length && sectionId && tableId) {
      const decodedSectionId = decodeURIComponent(sectionId);
      const decodedTableId = decodeURIComponent(tableId);

      const section = sections.find((sec) => `${sec.id}` === decodedSectionId);
      if (section) {
        setCurrentSection(section);
        const table = section.tables.find(
          (tbl) => tbl.name.toLowerCase() === decodedTableId.toLowerCase()
        );
        if (table) {
          setCurrentTable(table);
          setTableData(table.rows);

          const allColumnNames = new Set();
          table.rows.forEach((row) =>
            row.cells.forEach((cell) => allColumnNames.add(cell.column_name))
          );

          setHeaders(Array.from(allColumnNames));
        }
      }
    }
  }, [sections, sectionId, tableId]);

  const handleCellEdit = (rowIndex, header, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].cells = updatedTableData[rowIndex].cells.map((cell) =>
      cell.column_name === header ? { ...cell, value } : cell
    );
    setTableData(updatedTableData);
  };

  const handleAddRow = () => {
    const newRow = {
      row_number: tableData.length + 1,
      cells: headers.map((header) => ({
        column_name: header,
        value: "",
      })),
    };
    setTableData([...tableData, newRow]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedData = {
        rows: tableData,
        tableData: tableId,
      };
      const response = await axios.put(
        `http://127.0.0.1:8000/api/sections/${currentSection.id}/`,
        updatedData
      );
      console.log("Data saved successfully:", response.data);
      setTableData(response.data.tables[`${tableId}`].rows);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...tableData.map(row =>
        headers.map(header => {
          const cell = row.cells.find(cell => cell.column_name === header);
          return cell ? `"${cell.value}"` : "";
        }).join(",")
      )].join("\n");

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, `${currentTable.name}_data.csv`);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${currentTable.name} Data`, 10, 10);
    let y = 20;
    doc.text(headers.join(" | "), 10, y);
    y += 10;

    tableData.forEach(row => {
      const rowText = headers.map(header => {
        const cell = row.cells.find(cell => cell.column_name === header);
        return cell ? cell.value : "";
      }).join(" | ");
      doc.text(rowText, 10, y);
      y += 10;
    });

    doc.save(`${currentTable.name}_data.pdf`);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value.toLowerCase());
  };

  const filteredData = tableData.filter(row =>
    row.cells.some(cell => cell.value.toLowerCase().includes(filterText))
  );

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error")}</div>;

  return (
    <div className="p-6 text-center">
      {currentSection && currentTable ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{t("table")}: {currentTable.name}</h1>
          <h3 className="text-xl mb-4">{t("section")}: {currentSection.name}</h3>

          <button
            onClick={toggleEditMode}
            className="mb-4 bg-yellow-500 text-white p-2 rounded"
          >
            {isEditing ? t("switch_to_view_mode") : t("switch_to_edit_mode")}
          </button>

          <input
            type="text"
            placeholder={t("filter_placeholder")}
            value={filterText}
            onChange={handleFilterChange}
            className="mb-4 p-2 border rounded w-full"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Row Number</th>
                  {headers.map((header, index) => (
                    <th key={index} className="px-4 py-2 border-b">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length ? filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-4 py-2 border-b">{row.row_number}</td>
                    {headers.map((header, headerIndex) => {
                      const cell = row.cells.find((cell) => cell.column_name === header);
                      return (
                        <td key={headerIndex} className="px-4 py-2 border-b">
                          {isEditing ? (
                            <input
                              type="text"
                              value={cell ? cell.value : ""}
                              onChange={(e) => handleCellEdit(rowIndex, header, e.target.value)}
                              className="border p-1"
                            />
                          ) : (
                            <span>{cell.value ? t(cell.value) : "N/A"}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )) : <tr><td colSpan={headers.length + 1}>{t("no_data")}</td></tr>}
              </tbody>
            </table>
          </div>

          {isEditing && (
            <button
              onClick={handleAddRow}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {t("add_row")}
            </button>
          )}

          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-4 ml-4 bg-blue-500 text-white p-2 rounded"
              disabled={saving}
            >
              {saving ? t("saving") : t("save_changes")}
            </button>
          )}

          <div className="mt-6">
            <button
              onClick={handleDownloadCSV}
              className="bg-gray-700 text-white p-2 rounded mr-2"
            >
              {t("download_csv")}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-gray-700 text-white p-2 rounded"
            >
              {t("download_pdf")}
            </button>
          </div>
        </>
      ) : (
        <div>{t("section_or_table_not_found")}</div>
      )}
    </div>
  );
};

export default DynamicTablePage;
