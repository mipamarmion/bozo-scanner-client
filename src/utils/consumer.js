"use strict";

async function getSkuData(sku) {
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };
  return await fetch("./get/sku_search?sku=" + sku, requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
          return {result: result};
      },
      (error) => {
          return {error: error};
      }
    )
}

async function newSku(skuData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skuData)
    };
    return await fetch("./new", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
            return {result: result};
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            return {error: error};
        }
      )
}

async function updateSkuStock(skuData) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skuData)
    };
    return await fetch("./update/sku", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
            return {result: result};
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            return {error: error};
        }
      )
}

async function getDistincts(field) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return await fetch("./get/distincts?field=" + field, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
            return {result: result};
        },
        (error) => {
            return {error: error};
        }
      )
}

async function getInventory() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return await fetch("./get/inventory" + sku, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
            return {result: result};
        },
        (error) => {
            return {error: error};
        }
      )
  }

export { getSkuData, newSku, getDistincts, updateSkuStock, getInventory };
