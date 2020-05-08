import Knex from "knex";
import * as T from './Vocabulary.type';

export default function (db: Knex) {
  return {
    db,
    createNoun(params: T.NewNoun) {
      return this.db.insert({ ...params }).into('vocabulary_nouns').returning('*');
    },
    createVerb(params: T.NewVerb) {
      return this.db.insert({ ...params }).into('vocabulary_verbs').returning('*');
    },
    createIPC(params: T.NewIndicativePersentConjugation, verb: T.Verb) {
      return this.db.insert({
        verb_id: verb.id,
        first_person: params.firstPerson,
        second_person: params.secondPerson,
        third_person: params.thirdPerson,
        first_person_plural: params.firstPersonPlural,
        second_person_plural: params.secondPersonPlural,
        third_person_plural: params.thirdPersonPlural,
      }).into('indicative_present_conjugations').returning('*');
    },
  };
};
