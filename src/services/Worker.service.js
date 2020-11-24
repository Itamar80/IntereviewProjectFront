import axios from 'axios';

export const workerService = {
  getWorkers,
  deleteWorker,
  saveWorker,
}

async function getWorkers() {
  try {
    const response = await axios.get('http://localhost:3000/');
    if (response.status !== 200) {
      throw new Error('Something is wrong');
    }
    return response.data
  } catch (err) {
    console.log('there is an error', err);
  }
}

async function _addWorker(worker) {
  try {
    const response = await axios.post('http://localhost:3000/', worker);
    if (response.status !== 200) {
      throw new Error('Something is wrong');
    }
    return response.data
  } catch (err) {
    console.log('there is an error', err);
  }
}

async function _updateWorker(worker) {
  try {
    const response = await axios.put(`http://localhost:3000/${worker.id}`, worker);
    if (response.status !== 200) {
      throw new Error('Something is wrong');
    }
    return response.data
  } catch (err) {
    console.log('there is an error', err);
  }
}

function saveWorker(worker) {
  return worker.id ? _updateWorker(worker) : _addWorker(worker)
}

async function deleteWorker(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/${id}`);
    if (response.status !== 200) {
      throw new Error('Something is wrong');
    }
    return response.body
  } catch (err) {
    console.log('there is an error', err);
  }
}
