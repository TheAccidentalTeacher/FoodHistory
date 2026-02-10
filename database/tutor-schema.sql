-- AI Tutor Database Schema
-- Tables for tracking conversations and messages

-- Main conversation tracking
CREATE TABLE tutor_conversations (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT REFERENCES student_profiles(id) ON DELETE CASCADE,
  unit_id BIGINT REFERENCES units(id) ON DELETE SET NULL,
  lesson_id BIGINT REFERENCES lessons(id) ON DELETE SET NULL,
  
  -- Context tracking
  current_paragraph TEXT, -- What they're reading
  activity_type TEXT, -- 'quiz', 'reflection', 'map', 'project', null
  
  -- Pedagogical tracking
  geographic_themes_discussed TEXT[], -- Which of 5 themes covered
  inquiry_depth INTEGER DEFAULT 0, -- How deep in Socratic questioning
  engagement_level TEXT DEFAULT 'medium', -- 'high', 'medium', 'low'
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Metadata
  total_messages INTEGER DEFAULT 0,
  total_tokens_used INTEGER DEFAULT 0
);

-- Individual messages in conversations
CREATE TABLE tutor_messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT REFERENCES tutor_conversations(id) ON DELETE CASCADE,
  
  -- Message content
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  
  -- Pedagogical tracking
  referenced_themes TEXT[], -- Which geographic themes mentioned
  prompted_action TEXT, -- 'video_search', 'map_exploration', 'reflection', null
  thinking_level TEXT, -- 'surface', 'analytical', 'evaluative'
  
  -- Token usage (for cost tracking)
  tokens_used INTEGER,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tutor_conversations_student ON tutor_conversations(student_id);
CREATE INDEX idx_tutor_conversations_lesson ON tutor_conversations(lesson_id);
CREATE INDEX idx_tutor_conversations_activity ON tutor_conversations(last_activity_at DESC);
CREATE INDEX idx_tutor_messages_conversation ON tutor_messages(conversation_id);
CREATE INDEX idx_tutor_messages_created ON tutor_messages(created_at DESC);

-- RLS Policies
ALTER TABLE tutor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;

-- Students can only see their own conversations
CREATE POLICY "Students can view own conversations" ON tutor_conversations
  FOR SELECT
  USING (auth.uid()::TEXT = student_id::TEXT);

CREATE POLICY "Students can create conversations" ON tutor_conversations
  FOR INSERT
  WITH CHECK (auth.uid()::TEXT = student_id::TEXT);

CREATE POLICY "Students can update own conversations" ON tutor_conversations
  FOR UPDATE
  USING (auth.uid()::TEXT = student_id::TEXT);

-- Students can only see messages from their conversations
CREATE POLICY "Students can view own messages" ON tutor_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tutor_conversations
      WHERE id = tutor_messages.conversation_id
      AND auth.uid()::TEXT = student_id::TEXT
    )
  );

CREATE POLICY "Students can create messages" ON tutor_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tutor_conversations
      WHERE id = tutor_messages.conversation_id
      AND auth.uid()::TEXT = student_id::TEXT
    )
  );

-- Teachers can view all conversations (for monitoring/support)
CREATE POLICY "Teachers can view all conversations" ON tutor_conversations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM teacher_profiles
      WHERE user_id::TEXT = auth.uid()::TEXT
    )
  );

CREATE POLICY "Teachers can view all messages" ON tutor_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM teacher_profiles
      WHERE user_id::TEXT = auth.uid()::TEXT
    )
  );

-- Function to update last_activity_at on new message
CREATE OR REPLACE FUNCTION update_conversation_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tutor_conversations
  SET 
    last_activity_at = NOW(),
    total_messages = total_messages + 1,
    total_tokens_used = total_tokens_used + COALESCE(NEW.tokens_used, 0)
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON tutor_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_activity();

COMMENT ON TABLE tutor_conversations IS 'Tracks AI tutor conversations with students, including pedagogical metadata';
COMMENT ON TABLE tutor_messages IS 'Individual messages in tutor conversations with geographic theme tracking';
