import { CopyIcon, Share2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  EmailShare,
  FacebookShare,
  TwitterShare,
  WhatsappShare,
} from "react-share-kit";

interface ShareProps {
  link?: string;
}

const ShareComp = ({ link }: ShareProps) => {
  
  return (
    <div className="border border-gray-500 rounded-lg w-96 ">
      <div className="flex justify-between items-center border-b border-gray-500 px-4 py-2">
        <h1 className="text-lg font-semibold">Share</h1>
        <Share2 className="w-5 h-5" />
      </div>
      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={link}
              readOnly
              className="text-text"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="p-4 copy"
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <FacebookShare url={link!} size={48} borderRadius={10} />
          <WhatsappShare url={link!} size={48} borderRadius={10} />
          <TwitterShare url={link!} size={48} borderRadius={10} />
          <EmailShare url={link!} size={48} borderRadius={10} />
        </div>
      </div>
    </div>
  );
};

export default ShareComp;
