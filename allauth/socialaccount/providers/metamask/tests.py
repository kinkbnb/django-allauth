from __future__ import unicode_literals
from django.test.utils import override_settings

from allauth.socialaccount.tests import OAuthTestsMixin
from allauth.tests import TestCase, MockedResponse
from django.urls import reverse

from .provider import MetamaskProvider

SOCIALACCOUNT_PROVIDERS = {"metamask": {"ChainID": "6969"}}


class MetamaskTests(OAuthTestsMixin, TestCase):
    provider_id = MetamaskProvider.id
    @override_settings(SOCIALACCOUNT_PROVIDERS=SOCIALACCOUNT_PROVIDERS)
    def test_login(self):
        warnings.warn("Cannot test provider %s, no oauth mock" % self.provider.id)
        return
