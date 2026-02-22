import React, { useState, useCallback } from "react";

const CropDoctorAPI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
    setDiagnosis(null);
  };

  const handleImageChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result.replace(/^data:image\/[a-z]+;base64,/, ""));
      reader.onerror = reject;
    });

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setLoading(true);

    try {
      const base64Image = await toBase64(selectedFile);

      const response = await fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "oJJm2h3q0hbqaGgnGWLITRRxm3X9Gkk5LYY9dnZIi1cf4aBykr", // Replace with your key
        },
        body: JSON.stringify({
          images: [base64Image],
          modifiers: ["similar_images"],
          plant_details: [
            "common_names",
            "url",
            "wiki_description",
            "taxonomy",
            "synonyms",
          ],
        }),
      });

      const data = await response.json();

      if (data?.suggestions?.length > 0) {
        const suggestion = data.suggestions[0];
        const details = suggestion.plant_details;

        setDiagnosis({
          name: suggestion.plant_name,
          probability: (suggestion.probability * 100).toFixed(2) + "%",
          description:
            details?.wiki_description?.value || "No description available.",
          commonNames: details?.common_names?.join(", ") || "N/A",
          taxonomy: details?.taxonomy || {},
          url: details?.url || null,
        });
      } else {
        setDiagnosis("No diagnosis found.");
      }
    } catch (error) {
      setDiagnosis("Error during diagnosis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
          dragActive
            ? "border-green-600 bg-green-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <p className="font-medium text-gray-700">Drag & Drop image here</p>
        <p className="text-sm text-gray-500 mb-3">OR click below to browse</p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="fileUpload"
        />

        <label
          htmlFor="fileUpload"
          className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition"
        >
          Browse Image
        </label>
      </div>

      {/* Preview */}
      {previewImage && (
        <div className="mt-6">
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Diagnosing..." : "Analyze Crop"}
          </button>
        </div>
      )}

      {/* Diagnosis Result */}
      {diagnosis && typeof diagnosis === "object" && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-green-200">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            🌿 Disease Report
          </h2>

          {/* 🔥 Highlighted Disease Name */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-4">
            <p className="text-lg font-bold text-red-600">
              🦠 Detected Disease: {diagnosis.name}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Confidence: {diagnosis.probability}
            </p>
          </div>

          <p>
            <strong>Common Names:</strong> {diagnosis.commonNames}
          </p>
          <p className="mt-2">
            <strong>Description:</strong> {diagnosis.description}
          </p>

          {diagnosis.taxonomy && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Family:</strong> {diagnosis.taxonomy.family}
              </p>
              <p>
                <strong>Genus:</strong> {diagnosis.taxonomy.genus}
              </p>
              <p>
                <strong>Order:</strong> {diagnosis.taxonomy.order}
              </p>
            </div>
          )}

          {diagnosis.url && (
            <a
              href={diagnosis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-3 inline-block"
            >
              More Information 🔗
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default CropDoctorAPI;
