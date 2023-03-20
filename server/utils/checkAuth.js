import  jwt  from 'jsonwebtoken' // вот здесь была ошибка(регистр буквы "j" был верхний)

// req.headers.authorization = 'Bearer 723hd3ggd2uddjasd283hh'
export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.userId = decoded.id

            next()
        } catch (error) {
            return res.json({
                message: 'Доступ заборонено.'
            })
        }
    } else {
        return res.json({
            message: 'Доступ заборонено.'
        })
    }
}

