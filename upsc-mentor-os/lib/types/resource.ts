export interface Resource {
  id: string;
  subjectId: string;

  name: string;

  category:
    | "Book"
    | "NCERT"
    | "Notes"
    | "Video"
    | "Website"
    | "PYQ"
    | "Test Series"
    | "Current Affairs"
    | "Other";

  priority:
    | "Essential"
    | "Recommended"
    | "Reference";

  url?: string;

  author?: string;

  publisher?: string;

  active: boolean;
}