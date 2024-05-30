const fetch = require('node-fetch');

// Função para obter dados de uma corrida específica
async function getRaceData(year, round) {
  const response = await fetch(`https://ergast.com/api/f1/${year}/${round}/results.json`);
  const data = await response.json();
  return data.MRData.RaceTable.Races[0];
}

// Função para obter dados de um piloto específico
async function getDriverData(driverId) {
  const response = await fetch(`https://ergast.com/api/f1/drivers/${driverId}/driverStandings.json`);
  const data = await response.json();
  return data.MRData.StandingsTable.StandingsLists;
}

// Função para obter a lista de pilotos de uma temporada
async function getDriversList(year) {
  const response = await fetch(`https://ergast.com/api/f1/${year}/drivers.json`);
  const data = await response.json();
  return data.MRData.DriverTable.Drivers;
}

// Exemplo de como usar as funções
(async () => {
  const year = 2024; // Ano da temporada
  const round = 6; // Número da corrida na temporada

  // Obtendo dados da corrida
  const raceData = await getRaceData(year, round);
  console.log(`\nCorrida: ${raceData.raceName}`);
  console.log(`Data: ${raceData.date}`);
  console.log(`Circuito: ${raceData.Circuit.circuitName}\n`);

  // Listando os resultados da corrida
  console.log("Grid Final");
  raceData.Results.forEach((result, index) => {
  console.log(`${index + 1}. ${result.Driver.givenName} ${result.Driver.familyName} (${result.Constructor.name})`);
  });

  //Obtendo dados de um piloto específico 
  const driverId = 'norris'; // ID do piloto na API
  const driverData = await getDriverData(driverId);
  const driverFullName = driverData.driverName; 
  console.log(`\nDados do piloto ${driverFullName ? driverFullName : driverId}: ${JSON.stringify(driverData, null, 2)}\n`);
  

  // Obtendo lista de pilotos da temporada
  //const drivers = await getDriversList(year);
  //console.log(`Lista de pilotos para a temporada ${year}:`);
  //drivers.forEach(driver => {
    //console.log(`ID: ${driver.driverId}, Nome: ${driver.givenName} ${driver.familyName}`);
  //});
})();
