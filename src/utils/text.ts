/** Une las unidades a su número con un espacio de no separación («228,5 mm», «400 kg»). */
export const nbUnits = (text: string) => text.replace(/ (mm|cm|m|kg|W\/m²K)(?=[\s,.;)]|$)/g, ' $1');
