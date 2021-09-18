import Owner from './StackOwner';

export default interface StackAnswer {
  owner: Owner;
  is_accepted: boolean;
  score: number;
  last_activity_date: number;
  last_edit_date: number;
  creation_date: number;
  answer_id: number;
  question_id: number;
  content_license: string;
}
