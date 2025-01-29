const apiUrl = "https://restcountries.com/v3.1";

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const mapa = document.getElementById("mapa");

  // Función para obtener los datos de la API
  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`);
      if (!response.ok) throw new Error("Error al obtener los datos");
      return response.json();
    } catch (error) {
      showError(error.message);
    }
  };

  // Función para ocultar el mapa y mostrar el contenido
  const ocultarMapa = () => {
    mapa.style.display = "none";
    content.style.display = "block";
  };

  // Función para renderizar los países
  const renderCountries = (pais) => {
    const contenedorPais = document.createElement("div");
    contenedorPais.innerHTML = `
      <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; padding: 20px;">
        <div class="card" style="width: 18rem;">
          <img src="${pais.flags.png}" class="card-img-top" alt="${pais.name.common}">
          <div class="card-body">
            <h5 class="card-title">${pais.name.common}</h5>
            <p class="card-text">Región: ${pais.region}</p>
          </div>
        </div>
      </div>
    `;
    content.appendChild(contenedorPais);
  };

  // Función para mostrar errores
  const showError = (message) => {
    content.innerHTML = `
      <div style="color: red; text-align: center; margin-top: 20px;">
        <strong>Error:</strong> ${message}
      </div>
    `;
  };

  // Mostrar todos los países
  document.getElementById("showAll").addEventListener("click", async () => {
    ocultarMapa();
    const countries = await fetchData("all");
    content.innerHTML = "";
    countries.forEach(pais => {
      renderCountries(pais);
    });
  });

  // Búsqueda por nombre de país
  document.getElementById("searchByName").addEventListener("click", () => {
    ocultarMapa();
    content.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 65vh;">
        <div style="text-align: center; padding: 30px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
          <label class="form-label" for="countryName">Ingrese el nombre del país:</label>
          <input type="text" id="countryName" name="countryName" class="form-control" style="margin-bottom: 10px; width: 100%; max-width: 300px;">
          <br>
          <button id="searchByCountry" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    `;

    document.getElementById("searchByCountry").addEventListener("click", async () => {
      const countryName = document.getElementById("countryName").value.trim();
      content.innerHTML = "";
      if (countryName) {
        const countries = await fetchData(`name/${countryName}`);
        if (countries && countries.length > 0) {
          countries.forEach(pais => {
            renderCountries(pais);
          });
        } else {
          showError("No se encontraron países con ese nombre.");
        }
      } else {
        showError("Por favor ingrese un nombre de país.");
      }
    });
  });

  // Búsqueda por capital
  document.getElementById("searchByCapital").addEventListener("click", () => {
    ocultarMapa();
    content.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 65vh;">
        <div style="text-align: center; padding: 30px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
          <label class="form-label" for="capitalName">Ingrese el nombre de la capital:</label>
          <input type="text" id="capitalName" name="capitalName" class="form-control" style="margin-bottom: 10px; width: 100%; max-width: 300px;">
          <br>
          <button id="searchByCapitalButton" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    `;

    document.getElementById("searchByCapitalButton").addEventListener("click", async () => {
      const capitalName = document.getElementById("capitalName").value.trim();
      content.innerHTML = "";
      if (capitalName) {
        const countries = await fetchData(`capital/${capitalName}`);
        if (countries && countries.length > 0) {
          countries.forEach(pais => {
            renderCountries(pais);
          });
        } else {
          showError("No se encontraron países con esa capital.");
        }
      } else {
        showError("Por favor ingrese el nombre de una capital.");
      }
    });
  });

  // Filtro por región
  document.getElementById("filterByRegion").addEventListener("click", () => {
    ocultarMapa();
    content.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 65vh;">
        <div style="text-align: center; padding: 30px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
          <label class="form-label" for="regionInput">Ingrese la región:</label>
          <input type="text" id="regionInput" name="regionInput" class="form-control" style="margin-bottom: 10px; width: 100%; max-width: 300px;">
          <br>
          <button id="searchRegionButton" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    `;

    const searchRegionButton = document.getElementById("searchRegionButton");

    searchRegionButton.removeEventListener("click", handleRegionSearch);
    searchRegionButton.addEventListener("click", handleRegionSearch);

    async function handleRegionSearch() {
      const region = document.getElementById("regionInput").value.trim();
      content.innerHTML = "";
      if (region) {
        const countries = await fetchData(`region/${region}`);
        if (countries && countries.length > 0) {
          countries.forEach(pais => {
            renderCountries(pais);
          });
        } else {
          showError("No se encontraron países en esa región.");
        }
      } else {
        showError("Por favor ingrese una región.");
      }
    }
  });

  // Filtro por subregión
  document.getElementById("filterBySubregion").addEventListener("click", () => {
    ocultarMapa();
    content.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 65vh;">
        <div style="text-align: center; padding: 30px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
          <label class="form-label" for="subregionInput">Ingrese la subregión:</label>
          <input type="text" id="subregionInput" name="subregionInput" class="form-control" style="margin-bottom: 10px; width: 100%; max-width: 300px;">
          <br>
          <button id="searchSubregionButton" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    `;

    const searchSubregionButton = document.getElementById("searchSubregionButton");

    searchSubregionButton.removeEventListener("click", handleSubregionSearch);
    searchSubregionButton.addEventListener("click", handleSubregionSearch);

    async function handleSubregionSearch() {
      const subregion = document.getElementById("subregionInput").value.trim();
      content.innerHTML = "";
      if (subregion) {
        const countries = await fetchData(`subregion/${subregion}`);
        if (countries && countries.length > 0) {
          countries.forEach(pais => {
            renderCountries(pais);
          });
        } else {
          showError("No se encontraron países en esa subregión.");
        }
      } else {
        showError("Por favor ingrese una subregión.");
      }
    }
  });


  

  // Buscar países vecinos
  document.getElementById("searchNeighbors").addEventListener("click", () => {
    ocultarMapa(); // Ocultar el mapa antes de buscar países vecinos
    content.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 65vh;">
        <div style="text-align: center; padding: 30px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
          <label class="form-label" for="countryCode">Ingrese el código del país (ej: USA):</label>
          <input type="text" id="countryCode" name="countryCode" class="form-control" style="margin-bottom: 10px; width: 100%; max-width: 300px;">
          <br>
          <button id="findNeighborsButton" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    `;
  
    document.getElementById("findNeighborsButton").addEventListener("click", async () => {
      const code = document.getElementById("countryCode").value.trim().toUpperCase();
      content.innerHTML = "";
      if (code) {
        const country = await fetchData(`alpha/${code}`);
        if (country && country[0]?.borders) {
          // Usamos forEach para procesar los países vecinos
          const neighbors = await Promise.all(
            country[0].borders.map((border) => fetchData(`alpha/${border}`))
          );
          
          // Aplanar el array de países vecinos y renderizarlos
          neighbors.flat().forEach(pais => {
            renderCountries(pais);
           
          });
        } else {
          showError("No se encontraron países vecinos.");
        }
      } else {
        showError("Por favor ingrese un código de país válido.");
      }
    });
  });
  document.getElementById("searchByLanguage").addEventListener("click", () => {
    ocultarMapa(); // Ocultar el mapa antes de mostrar la búsqueda
    content.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 65vh;">
        <div style="text-align: center; padding: 30px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
          <label class="form-label" for="languageInput">Ingrese el idioma (ej: Spanish):</label>
          <input type="text" id="languageInput" name="languageInput" class="form-control" style="margin-bottom: 10px; width: 100%; max-width: 300px;">
          <br>
          <button id="findLanguageButton" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    `;
  
    document.getElementById("findLanguageButton").addEventListener("click", async () => {
      const language = document.getElementById("languageInput").value.trim();
   
      if (language) {
        const countries = await fetchData(`lang/${language}`);
        content.innerHTML = "";
        if (countries && countries.length > 0) {
          // Usamos forEach para renderizar los países
          countries.forEach(pais => {
            renderCountries(pais);
          });
        } else {
          showError("No se encontraron países que hablen ese idioma.");
        }
      } else {
        showError("Por favor ingrese un idioma.");
      }
    });
  });
});

