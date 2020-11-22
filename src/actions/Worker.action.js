import { workerService } from '../services/Worker.service'

export const loadWorkers = () => async dispatch => {
    const response = await workerService.getWorkers();
    return dispatch({ type: 'SET_WORKERS', payload: response })
}

export const addUpdateWorker = (worker) => async dispatch => {
    await workerService.saveWorker(worker);
    const response = await workerService.getWorkers()
    return dispatch({ type: 'SET_WORKERS', payload: response })
}

export const deleteWorker = (id) => async dispatch => {
    await workerService.deleteWorker(id);
    const response = await workerService.getWorkers()
    return dispatch({ type: 'SET_WORKERS', payload: response })
}
