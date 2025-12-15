#!/bin/bash
# Deploy CSS files to NAS via SCP

echo "Deploying CSS files to NAS..."
scp -P 33725 utils.css utils.min.css ziad@nas.feralcreative.co:/volume1/web/feralcreative.dev/

if [ $? -eq 0 ]; then
    echo "✅ Successfully deployed utils.css and utils.min.css"
else
    echo "❌ Deployment failed"
    exit 1
fi

