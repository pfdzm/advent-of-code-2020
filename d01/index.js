// imperative style :)
// O(n2)
function findTwoEntriesThatSum2020(input) {
  let res1, res2;
  for (let i = 0; i < input.length; i++) {
    if (res1 && res2) break;
    const num1 = input[i];
    // console.log(num1);
    for (let j = i + 1; j < input.length; j++) {
      const num2 = input[j];
      //   console.log(num2);
      if (num1 + num2 === 2020) {
        res1 = num1;
        res2 = num2;
        break;
      }
    }
  }
  return { result: res1 * res2, res1, res2 };
}

function findThreeEntriesThatSum2020(input) {
  let res1, res2, res3;
  input.sort(function (a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else return 0;
  });
  for (let i = 0; i < input.length; i++) {
    if (res1 && res2 && res3) break;
    const num1 = input[i];
    if (num1 >= 2020) {
      break;
    }
    // console.log(num1);
    for (let j = i + 1; j < input.length; j++) {
      const num2 = input[j];
      //   console.log(num2);
      for (let k = j + 1; k < input.length; k++) {
        if (num1 + num2 >= 2020) {
          break;
        }
        const num3 = input[k];
        if (num1 + num2 + num3 === 2020) {
          res1 = num1;
          res2 = num2;
          res3 = num3;
          break;
        }
      }
    }
  }
  return { result: res1 * res2 * res3, res1, res2, res3 };
}

const realINPUT = [
  1768,
  1847,
  1905,
  1713,
  1826,
  1846,
  1824,
  1976,
  1687,
  1867,
  1665,
  1606,
  1946,
  1886,
  1858,
  346,
  1739,
  1752,
  1700,
  1922,
  1865,
  1609,
  1617,
  1932,
  1346,
  1213,
  1933,
  834,
  1598,
  1191,
  1979,
  1756,
  1216,
  1820,
  1792,
  1537,
  1341,
  1390,
  1709,
  1458,
  1808,
  1885,
  1679,
  1977,
  1869,
  1614,
  1938,
  1622,
  1868,
  1844,
  1969,
  1822,
  1510,
  1994,
  1337,
  1883,
  1519,
  1766,
  1554,
  1825,
  1828,
  1972,
  1380,
  1878,
  1345,
  1469,
  1794,
  1898,
  1805,
  1911,
  1913,
  1910,
  1318,
  1862,
  1921,
  1753,
  1823,
  1896,
  1316,
  1381,
  1430,
  1962,
  1958,
  1702,
  1923,
  1993,
  1789,
  2002,
  1788,
  1970,
  1955,
  1887,
  1870,
  225,
  1696,
  1975,
  699,
  294,
  1605,
  1500,
  1777,
  1750,
  1857,
  1540,
  1329,
  1974,
  1947,
  1516,
  1925,
  1945,
  350,
  1669,
  1775,
  1536,
  1871,
  1917,
  1249,
  1971,
  2009,
  1585,
  1986,
  1701,
  1832,
  1754,
  1195,
  1697,
  1941,
  1919,
  2006,
  1667,
  1816,
  1765,
  1631,
  2003,
  1861,
  1000,
  1791,
  1786,
  1843,
  1939,
  1951,
  269,
  1790,
  1895,
  1355,
  1833,
  1466,
  1998,
  1806,
  1881,
  1234,
  1856,
  1619,
  1727,
  1874,
  1877,
  195,
  1783,
  1797,
  2010,
  1764,
  1863,
  1852,
  1841,
  1892,
  1562,
  1650,
  1942,
  1695,
  1730,
  1965,
  1632,
  1981,
  1900,
  1991,
  1884,
  1278,
  1062,
  1394,
  1999,
  2000,
  1827,
  1873,
  1926,
  1434,
  1802,
  1579,
  1879,
  1671,
  1549,
  1875,
  1838,
  1338,
  1864,
  1718,
  1800,
  1928,
  1749,
  1990,
  1705,
];

console.log(findTwoEntriesThatSum2020(realINPUT));
console.log(findThreeEntriesThatSum2020(realINPUT));
