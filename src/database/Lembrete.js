import db from './SQLiteDatabase'

db.transaction(tx => {
    // tx.executeSql(
    //     "DROP TABLE lembrete;"
    // )

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS lembrete(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(50), horario VARCHAR(45), finalizado INT, inicio DATETIME, final DATETIME, descricao TEXT, data_criacao DATETIME)"
    )

})

const create = (obj) => {
    return new Promise( (resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO lembrete (titulo, horario, finalizado, inicio, final, descricao, data_criacao) VALUES (?, ?, ?, ?, ?, ?, ?);" , [obj.titulo, obj.horario, obj.finalizado, obj.inicio, obj.final, obj.descricao, obj.data_criacao],
                    (_, {rowsAffected, insertId}) => {
                        if(rowsAffected > 0)
                            resolve(insertId)
                        else
                            reject('Erro inserindo o obj: ' +JSON.stringify(obj))
                    },
                    (_, error) => reject(error)
                )
            }
        )
    })
}

const all = () => {
    return new Promise( (resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM lembrete ORDER BY inicio', [],
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error)
                )
            }
        )
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "DELETE FROM lembrete WHERE id=?;",
          [id.id],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
};

const finalizar = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE lembrete SET finalizado = 1 WHERE id=?;",
                [id.id],
                (_, {rowsAffected}) => {
                    resolve(rowsAffected);
                },
                (_, error) => reject(error)
            );
        });
    });
}

export default { create, all, finalizar, remove }