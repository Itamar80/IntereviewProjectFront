import { workerService } from '../services/Worker.service'

// getting workers from backend and sending to reducer to update state
export const loadWorkers = () => async dispatch => {
    const response = await workerService.getWorkers();
    return dispatch({ type: 'SET_WORKERS', payload: response })
}

// save or update worker, then 
// getting workers from backend and sending to reducer to update state
export const addUpdateWorker = (worker) => async dispatch => {
    await workerService.saveWorker(worker);
    const response = await workerService.getWorkers()
    return dispatch({ type: 'SET_WORKERS', payload: response })
}

// delete worker, then
// getting workers from backend and sending to reducer to update state

export const deleteWorker = (id) => async dispatch => {
    await workerService.deleteWorker(id);
    const response = await workerService.getWorkers()
    return dispatch({ type: 'SET_WORKERS', payload: response })
}
