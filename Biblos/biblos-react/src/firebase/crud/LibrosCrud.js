import {db, storage} from '../config/config';
// label firestore utilities
import {
    collection as GetCollection,
    doc as DocRef,
    addDoc as AddDoc,
    setDoc as SetDoc,
    getDocs as GetDocs,
    deleteDoc as DeleteDoc,
    query as SetQuery,
    where as setWhere,
    orderBy as OrderBy,
    limit as Limit,
    startAt as StartAt,
    documentId as DocIdKey,
} from 'firebase/firestore';
// label Libro class document
import Libro from "../../database/models/Libro";
// label validations for the class
import * as validator from '../../database/validations';

// label Fields if the database
/**Name of the collection*/
const COLLECTION = "books";
const TITLE_FIELD = 'image';
const IMAGE_FIELD = 'title';
const AUTHOR_FIELD = 'author';
const PRICE_FIELD = 'price';


// LABEL constants of the file.

// label For pagination: elements per page
/*Pagination: Doc per page*/
const DOC_PER_PAGE = 3;
// Default key to order the book.
const DEFAULT_ORDER = "title";

// label: instances of class

const dbConnection = GetCollection(db, COLLECTION);

/**Get all documents, without conditions.*/
export async function getAll() {
    return GetDocs(SetQuery(dbConnection));
}

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
            createQueryConndition(keyCondition, conditional, valueCondition);
    });

    // label Filter not null values
    conditionsMapped = conditionsMapped.filter(c => !c.isEmpty());

    orderBy = orderBy || DEFAULT_ORDER;

    // label Query object to fill in case limit not exists
    var queryDocs;

    if (limit) {
        // label Check if limit exists
        limit = (!limit || limit < 1) ? DOC_PER_PAGE : limit;

        queryDocs = SetQuery(dbConnection, StartAt(startFrom),
            Limit(limit), ...conditionsMapped, orderBy);
    } else {
        //    label in case limit was not applied
        queryDocs = SetQuery(dbConnection, StartAt(startFrom), ...conditionsMapped, OrderBy(orderBy));
    }
    return GetDocs(queryDocs);
}

/**Create a book into the database.<br/>
 * @param book object reference to be added to the database.
 * @return A promise if the given object is a {@link Libro}, otherwise return a error array.*/
export async function createDocument(book) {
    var message;

    if (isCorrectDocument(book)) {
        message = `Need a instance of ${Libro} to create a new document. \nInstance used: ${typeof book}`;
        return showMessageNotValidInstance(message);
    }

    return AddDoc(dbConnection, getDocumentDataAsObject(book));
}

/**update the given {@link Libro} with its values, <i><strong>id is required</strong></i>.*/
export function updateDocument(book) {
    var message;

    const {id} = book;
    let {title, image, author, price} = book;

    if (!isCorrectDocument(book)) {
        message = `Need a instance of ${Libro} to create a new document.\nInstance used: ${typeof book}`;
        return showMessageNotValidInstance(message);
    }

    /*label Check if the book contain values */
    if (book || Object.keys(book).length === 0) {
        message = validator.MESSAGE_NO_VALUES('libro');
    }

    /* label Check if the title was filled*/
    if (!title && validator.isEquals(title, null)) {
        message = validator.MESSAGE_NO_VALUES('titulo');
        return showMessageNotValidInstance(message);
    }

    /*label Check if the author was filled*/
    if (!author || Object.keys(author).length === 0) {
        message = validator.MESSAGE_NO_VALUES('autor');
        return showMessageNotValidInstance(message);
    }

    /* label Check if the price is less than 0*/
    if (!price || price < 0) {
        book.price = 0;
    }

    /*Set the values*/
    return SetDoc(DocRef(dbConnection, COLLECTION, id), getDocumentDataAsObject(book));

}

/**Delete the {@link Libro} with its given id.<br/> <strong>Does not contain validations</strong>.
 * @param bookId the id of the book.*/
export function deteleDocument(bookId) {
    if (!bookId || bookId.trim().length === 0) {
        return showMessageNotValidInstance('Insert a valid id')
    }

    return DeleteDoc(DocRef(dbConnection, COLLECTION, bookId));

}

// label not exported methods

function getDocumentDataAsObject(book) {

    return {
        [IMAGE_FIELD]: book.image,
        [TITLE_FIELD]: book.title,
        [AUTHOR_FIELD]: book.author,
        [PRICE_FIELD]: book.price
    };
}

/**Return a where condition from the given arguments.*/
function createQueryConndition(key, condition, value) {
    return setWhere(key, condition, value);
}

/**Validate the document came from {@link Libro}*/
function isCorrectDocument(book) {
    return book instanceof Libro;
}

/**Create a invalid message error*/
function showMessageNotValidInstance(message) {
    return [false, message];
}