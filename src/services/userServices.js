const API = 'https://665a0986de346625136ed7d2.mockapi.io/api/'

export const createUserService = async (user) => {

    try {
        const users = await getUsersService()
        const userFound = users.find(u => u.email === user.email)
        if(userFound){
            alert('Ya existe un usuario con ese email')
            throw new Error('User already exists')
        }
        const response = await fetch(`${API}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const updateUserService = async (user) => {
    try {
        const response = await fetch(`${API}users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getUsersService = async () => {
    try {
        const response = await fetch(`${API}users`)
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

export const loginUserService = async (user) => {
    try {
        const users = await getUsersService()
        const userFound = users.find(u => u.email === user.email && u.password === user.password)
        return userFound
    } catch (error) {
        console.error(error)
    }
}

export const removeUserService = async (id) => {
    try {
        const response = await fetch(`${API}users/${id}`, {
            method: 'DELETE',
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getUserService = async (id) => {
    try {
        const response = await fetch(`${API}users/${id}`)
        return response.json()
    } catch (error) {
        console.error(error)
    }
}
export const convertToAdminService = async (id) => {
    try {
        const user = await getUserService(id)
        user.isAdmin = true
        const response = await updateUserService(user)
        return response
    } catch (error) {
        console.error(error)
    }
}