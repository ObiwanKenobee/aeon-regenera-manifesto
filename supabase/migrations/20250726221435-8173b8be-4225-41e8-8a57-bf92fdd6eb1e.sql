-- Create table for AI matchmaker applications
CREATE TABLE public.ai_matchmaker_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  interest TEXT NOT NULL,
  selected_option TEXT NOT NULL CHECK (selected_option IN ('partner', 'innovator', 'investor')),
  ai_analysis JSONB DEFAULT '{}',
  match_score NUMERIC,
  matched_opportunities JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'matched', 'contacted')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_matchmaker_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can create applications"
ON public.ai_matchmaker_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own applications"
ON public.ai_matchmaker_applications
FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own applications"
ON public.ai_matchmaker_applications
FOR UPDATE
USING (auth.uid() = user_id);

-- Create table for available opportunities
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  opportunity_type TEXT NOT NULL CHECK (opportunity_type IN ('partnership', 'innovation', 'investment')),
  requirements JSONB DEFAULT '{}',
  benefits JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  location TEXT,
  commitment_level TEXT,
  budget_range TEXT,
  timeline TEXT,
  contact_info JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for opportunities
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Opportunities policies
CREATE POLICY "Everyone can view active opportunities"
ON public.opportunities
FOR SELECT
USING (is_active = true);

CREATE POLICY "Authenticated users can create opportunities"
ON public.opportunities
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own opportunities"
ON public.opportunities
FOR UPDATE
USING (auth.uid() = created_by);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_ai_matchmaker_applications_updated_at
  BEFORE UPDATE ON public.ai_matchmaker_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_ai_matchmaker_applications_status ON public.ai_matchmaker_applications(status);
CREATE INDEX idx_ai_matchmaker_applications_selected_option ON public.ai_matchmaker_applications(selected_option);
CREATE INDEX idx_opportunities_type ON public.opportunities(opportunity_type);
CREATE INDEX idx_opportunities_active ON public.opportunities(is_active);
CREATE INDEX idx_opportunities_tags ON public.opportunities USING GIN(tags);