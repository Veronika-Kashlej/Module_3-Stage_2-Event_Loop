function findPrimes(start, end) {
  // Record the start time of the execution
  const startTime = Date.now();

  // Validate input parameters
  if (start < 1) {
    console.log("Enter correct start value");
    return;
  }
  if (end > 100_000_000) {
    console.log("Enter correct end value");
    return;
  }

  const primes = []; // Array to store found prime numbers
  const CHUNK_SIZE = 20;
  let chunkStart = start;
  let chunkEnd = Math.min(start + CHUNK_SIZE, end);
  const totalNumbers = end - start + 1;
  let processedCount = 0;
  let progress = 0;
  let lastReportedProgress = 0;

  // Start processing the first chunk asynchronously
  setTimeout(processChunk, 0);

  function processChunk() {
    // Process numbers in the current chunk
    for (let i = chunkStart; i < chunkEnd; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }

      processedCount++;

      // Calculate and display progress in 10% increments
      progress = (processedCount / totalNumbers) * 100;
      if (progress - lastReportedProgress >= 10) {
        console.log(`progress: ${Math.round(progress)}%`);
        lastReportedProgress = progress;
      }
    }

    // Check if all numbers have been processed
    if (chunkEnd === end) {
      console.log(`progress: ${Math.round(progress)}%`);
      console.log(`Number of found prime numbers: ${primes.length}`);
      console.log(`This function taked ${Date.now() - startTime} ms`);
    } else {
      // Move to the next chunk and schedule its processing
      chunkStart = chunkEnd;
      chunkEnd = Math.min(chunkStart + CHUNK_SIZE, end);
      setTimeout(processChunk, 0);
    }
  }

  function isPrime(number) {
    if (number < 2) return false;
    if (number === 2) return true;
    if (number % 2 === 0) return false;

    // Check odd divisors up to the square root of the number
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
      if (number % i === 0) {
        return false;
      }
    }

    return true;
  }
}

findPrimes(1, 508834);
