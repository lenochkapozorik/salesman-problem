const GA = require('geneticalgorithm');
const Cities = require('./cities.json');

// Define the GA's options
const options = {
    mutationFunction: GA.mutation.swap,
    crossoverFunction: GA.crossover.ordered,
    population: [],
    populationSize: 100,
    elitism: 0.1,
    randomSelection: 0.1,
    mutationProbability: 0.3,
    crossoverProbability: 0.7,
    fitnessFunction: (chromosome) => {
        let totalDistance = 0;
        for (let i = 0; i < chromosome.length - 1; i++) {
            totalDistance += Cities[chromosome[i]].distanceTo(Cities[chromosome[i + 1]]);
        }
        return totalDistance;
    }
};

// Initialize the GA
const ga = new GA(options);

// Generate the initial population
for (let i = 0; i < options.populationSize; i++) {
    options.population.push(ga.generateIndividual(Cities.length));
}

// Run the GA
ga.evolve(1000);

// Get the best solution
const best = ga.best();
console.log("Best solution:", best);
console.log("Fitness:", ga.fitness(best));
