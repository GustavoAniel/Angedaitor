import db from './SQLiteDatabase'

db.transaction(tx => {
    tx.executeSql(
        "DROP TABLE cars;"
    )

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS lembrete(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(50), inicio DATETIME, fim DATETIME, descricao TEXT)"
    )
})

const create = (obj) => {
    return new Promise( (resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO lembrete (titulo, inicio, final, descricao) VALUES (?, ?, ?, ?);" , [obj.titulo, obj.inicio, obj.final, obj.descricao],
                    (_, {rowsAffected, insertId}) => {
                        if(rowsAffected > 0)
                            resolve(insertId)
                        else
                            reject('Erro inserindo o obj: ' +JSON.stringify(obj))
                    },
                    error => reject(error)
                )
            }
        )
    })
}

const all = () => {
    return new Promise( (resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM lembrete', [],
                (_, { rows }) => resolve(rows._array),
                error => reject(error)
                )
            }
        )
    })
}

export default { create, all }