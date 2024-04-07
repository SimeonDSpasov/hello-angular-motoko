export const endpoints = {
  maintenance: 'maintenance',
  auth: {
    register: 'auth/register',
    login: 'auth/login',
    refreshAccessToken: 'auth/refresh-access-token',
  },
  user: {
    getUpdate: 'user',
    download: 'user/download',
    clearKeys: 'user/clear-keys',
    suspend: 'user/suspend',
    changePassword: 'user/change-password',
    updateUser: 'user/update/:id',
  },
  bybit: {
    validate: 'bybit/validate'
  },
  tournaments: {
    getAllTournaments: 'tournament/get',
    getTournamentByTitle: 'tournament/get-by-title/:title',
    addUserToTournament: 'tournament/add',
    removeUserFromTournament: 'tournament/remove',
  }
}
