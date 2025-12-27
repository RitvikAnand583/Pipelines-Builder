import { 
  Download, 
  Upload, 
  Bot, 
  FileText, 
  Globe, 
  GitBranch,
  FileCode,
  Puzzle,
  GitMerge
} from 'lucide-react';

// Icon mapping for node types
export const nodeIcons = {
  input: Download,
  output: Upload,
  llm: Bot,
  text: FileText,
  api: Globe,
  conditional: GitBranch,
  transform: FileCode,  
  integration: Puzzle,  
  merge: GitMerge,      
};

export default nodeIcons;