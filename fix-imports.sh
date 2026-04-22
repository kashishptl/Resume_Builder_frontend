#!/bin/bash

echo "Fixing imports..."

# Fix profile page
sed -i.bak '/import { createPageUrl } from "@\/utils";/d' app/profile/page.tsx

# Fix create-resume page
sed -i.bak '/import { createPageUrl } from "@\/lib\/utils";/d' app/create-resume/page.tsx

# Fix dashboard page  
sed -i.bak '/import { createPageUrl } from "@\/lib\/utils";/d' app/dashboard/page.tsx

# Fix register page
sed -i.bak '/import { createPageUrl } from "@\/lib\/utils";/d' app/register/page.tsx

echo "✅ Fixed all imports!"
echo "Cleaning up backup files..."
find . -name "*.bak" -delete

echo "✅ Done!"
