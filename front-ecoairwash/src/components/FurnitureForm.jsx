import React, { useState } from 'react';

const FurnitureForm = () => {
  const serviceOptions = ['Residencial', 'Comercial'];
  const seatsOptions = ['1 a 5', '6 a 10', 'Más de 10'];
  const materialOptions = ['Algodón', 'Cuero', 'Poliéster', 'Otro'];

  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [selectedSeats, setSelectedSeats] = useState(seatsOptions[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ selectedService, selectedSeats, selectedMaterial });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Opciones del formulario */}
      <div className="text-center text-lg font-semibold">Tipo de servicio:</div>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {serviceOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {/* Número de puestos */}
      <div className="text-center text-lg font-semibold">De cuántos puestos está conformada tu sala o muebles:</div>
      <select
        value={selectedSeats}
        onChange={(e) => setSelectedSeats(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {seatsOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {/* Tipo de tela o material */}
      <div className="text-center text-lg font-semibold">Tipo de tela o material:</div>
      <select
        value={selectedMaterial}
        onChange={(e) => setSelectedMaterial(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {materialOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {/* Botón de envío */}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Enviar</button>
    </form>
  );
};

export default FurnitureForm;
