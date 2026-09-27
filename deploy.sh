#!/bin/sh
# Publish abhiramkolal.com (S3 + CloudFront). Needs the "claude" AWS CLI profile
# and a local deploy.env (not committed) with BUCKET= and DISTRIBUTION=.
set -e
cd "$(dirname "$0")"
. ./deploy.env
export AWS_PROFILE=claude AWS_REGION=us-east-1
aws s3 sync . "s3://$BUCKET" --delete \
  --exclude ".git/*" --exclude ".gitignore" --exclude "deploy.sh" --exclude "deploy.env" \
  --exclude "README.md" --exclude ".DS_Store" --cache-control "max-age=300"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths "/*" --query Invalidation.Id --output text
echo "deployed: https://abhiramkolal.com"
