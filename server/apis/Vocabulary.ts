import express from 'express';
import Knex from 'knex';
import VocabularyModel from '../models/Vocabulary';
import * as T from '../models/Vocabulary.type';

export default function (app: express.Express, db: Knex) {
  const model = VocabularyModel(db);

  app.post('/vocabulary/noun', async (req, res) => {
    try {
      const newNoun: T.NewNoun = req.body;
      const result: T.Noun[] = await model.createNoun(newNoun);
      const createdNoun: T.Noun = { ...result[0] };
      res.status(200).json(createdNoun);
    } catch {
      res.status(400).json('Create new noun error...');
    }
  });

  app.post('/vocabulary/verb', async (req, res) => {
    try {
      const { IPC, ...newVerb }: {
        name: string;
        translation: string;
        info?: string;
        IPC: T.NewIndicativePersentConjugation;
      } = req.body;

      const result: T.Verb = await db.transaction(async trx => {
        const result1: T.Verb[] = await model.createVerb(newVerb).transacting(trx);
        const createdVerb = { ...result1[0] };

        const result2: T.IndicativePresentConjugation[] = await model.createIPC(IPC, createdVerb).transacting(trx);
        const createdIPC: T.IndicativePresentConjugation = { ...result2[0] };
        createdVerb.IPC = createdIPC;

        return createdVerb;
      });

      res.status(200).json(result);
    } catch {
      res.status(400).json('Create new verb error...');
    }
  });
};
