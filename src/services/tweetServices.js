const API = 'https://665a0986de346625136ed7d2.mockapi.io/api/'

export const createTweetService = async (userId,tweet) => {
    try {
        const response = await fetch(`${API}users/${userId}/tweets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...tweet, date: new Date()}),
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const getTweetsService = async (userId) => {
    try {
        const response = await fetch(`${API}users/${userId}/tweets`)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const removeTweetService = async (userId,tweetId) => {
    try {
        const response = await fetch(`${API}users/${userId}/tweets/${tweetId}`, {
            method: 'DELETE',
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const updateTweetService = async (userId,tweet) => {
    try {
        const response = await fetch(`${API}users/${userId}/tweets/${tweet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tweet),
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const getTweetService = async (userId,tweetId) => {
    try {
        const response = await fetch(`${API}users/${userId}/tweets/${tweetId}`)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}