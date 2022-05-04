import db from './SQLiteDatabase'

db.transaction(tx => {
    // tx.executeSql(
    //     "DROP TABLE lembrete;"
    // )

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS lembrete(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(50), inicio DATETIME, final DATETIME, descricao TEXT)"
    )

    console.log('teste')
})

const create = (obj) => {
    console.log(obj)
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
                tx.executeSql('SELECT * FROM lembrete', [],
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
          [id],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
};

export default { create, all, remove }