import Owner from './StackOwner';

export default interface StackQuestion {
  tags: string[];
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  accepted_answer_id: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  last_edit_date: number;
  creation_date: number;
  question_id: number;
  content_license: string;
  link: string;
  title: string;
}
