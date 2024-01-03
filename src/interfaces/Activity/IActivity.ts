export interface IActivity {
  direction: "outbound" | "inbound";
  from: number;
  to: number;
  via: number;
  duration: number;
  call_type: "missed" | "answered" | "voicemail";
  is_archived: boolean;
  id: string;
  created_at: string;
}
