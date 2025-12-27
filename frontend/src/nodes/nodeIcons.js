import { 
  Download, 
  Upload, 
  Bot, 
  FileText, 
  Globe, 
  GitBranch 
} from 'lucide-react';

// Icon mapping for node types
export const nodeIcons = {
  input: Download,
  output: Upload,
  llm: Bot,
  text: FileText,
  api: Globe,
  conditional: GitBranch,
};

export default nodeIcons;
