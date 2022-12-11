import {db, storage} from '../config/config';
// label firestore utilities
import {
    collection as GetCollection,
    setDoc,
    getDocs as GetDocs,
    query as setQuery,
    where as setWhere,
    orderBy as OrderBy,
    limit as Limit,
    startAt as StartAt,
    documentId as DocIdKey,
} from 'firebase/firestore';
import libro from "../../componentes/Libro";

// LABEL constants of the file.
const COLLECTION = "users";
// label For pagination: elements per page
const DOC_PER_PAGE = 3;
// Default key yo order the book.
const DEFAULT_ORDER = "title";

// label: instances of class

const dbConnection = GetCollection(db, COLLECTION);

/**
 * Return all the books from the database, between a index index.<br/>
 * @param startFrom Start getting docs from the given index.<br/>
 * @param limit Amount of document to get from the database.<br/>
 * @param orderBy Order of the documents
 * @param conditions Conditions that should match to get the data.<br/>Note: <i>(key, condition, value)</i> */
export async function getAll(startFrom = 0, limit, orderBy, conditions = []) {
    let conditionsMapped;

    startFrom = (startFrom < 0) ? 0 : startFrom;

    conditionsMapped = conditions.map(condition => {
        const keyCondition = condition[0];
        const conditional = condition[1];
        const valueCondition = condition[2];
        return keyCondition && conditional && valueCondition &&
            createQuery(keyCondition, conditional, valueCondition);
    });

    // label Filter not null values
    conditionsMapped = conditionsMapped.filter(c => !c.isEmpty());

    orderBy = orderBy || DEFAULT_ORDER;

    if (limit) {
        // Check if limit exists
        limit = (!limit || limit < 1) ? DOC_PER_PAGE : limit;

        return setQuery(dbConnection, StartAt(startFrom), Limit(limit), ...conditionsMapped, orderBy);
    }else{
    //    label in case limit was not applied

        return setQuery(dbConnection, StartAt(startFrom), ...conditionsMapped, orderBy);
    }
}

/**Return a where condition from the given arguments.*/
function createQuery(key, condition, value) {
    return setWhere(key, condition, value);
}

/**Create a book into the database.<br/>
 * @param book object reference to be added to the database.*/
export async function createDocument(book) {
    const typeOf = typeof book;
    const isABook = book instanceof Libro;

    if(!isABook){
        return [false, `Need a instance of ${Libro} to create a new document. \nInstance used: ${typeOf}`];
    }

    return setDoc(dbConnection, book);
}
